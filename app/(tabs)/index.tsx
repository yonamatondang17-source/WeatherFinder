// app/(tabs)/index.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import WeatherCard from "@/components/WeatherCard";
import {
  fetchCoordinates,
  fetchWeather,
} from "@/constants/utils/weatherHelper";

export default function HomeScreen() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [cityInfo, setCityInfo] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const cardOpacity = useRef(new Animated.Value(0)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Animate header on mount
  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const getWeatherData = useCallback(
    async (cityName: string) => {
      if (!cityName || cityName.trim().length < 2) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError("");
      setWeatherData(null);
      cardOpacity.setValue(0);

      try {
        const city = await fetchCoordinates(cityName.trim(), controller.signal);
        setCityInfo(city);

        const weather = await fetchWeather(
          city.latitude,
          city.longitude,
          controller.signal,
        );
        setWeatherData(weather.current_weather);
        setDailyData(weather.daily || null);

        setSearchHistory((prev) => {
          const filtered = prev.filter(
            (h) => h.toLowerCase() !== city.name.toLowerCase(),
          );
          return [city.name, ...filtered].slice(0, 5);
        });

        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "Gagal mengambil data cuaca");
        setCityInfo(null);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [cardOpacity],
  );

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (searchInput.trim().length < 2) {
      setWeatherData(null);
      setCityInfo(null);
      setError("");
      return;
    }

    debounceTimer.current = setTimeout(() => {
      getWeatherData(searchInput);
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [searchInput, getWeatherData]);

  const onRefresh = useCallback(async () => {
    if (!searchInput || !cityInfo) return;
    setRefreshing(true);
    await getWeatherData(searchInput);
    setRefreshing(false);
  }, [searchInput, cityInfo, getWeatherData]);

  const isDay = weatherData?.is_day ?? 1;

  // Deep dark gradients — consistent with WeatherCard
  const gradientColors: [string, string, string] = isDay
    ? ["#0d1b35", "#102444", "#0a1628"]
    : ["#07091a", "#0b0e22", "#06080f"];

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-12, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.appTitle}>WeatherFinder</Text>
              <Text style={styles.appSubtitle}>
                {isDay ? "☀️" : "🌙"} Kondisi cuaca terkini
              </Text>
            </View>
            {/* Live dot indicator */}
            <View style={styles.liveDot}>
              <View style={styles.liveDotInner} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
        </Animated.View>

        {/* SEARCH BAR */}
        <SearchBar
          value={searchInput}
          onChangeText={setSearchInput}
          isDay={isDay}
        />

        {/* RIWAYAT */}
        <SearchHistory history={searchHistory} onSelect={setSearchInput} />

        {/* KONTEN */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="rgba(255,255,255,0.6)"
            />
          }
        >
          {/* EMPTY STATE */}
          {!isLoading && !weatherData && !error && (
            <View style={styles.emptyState}>
              <View style={styles.emptyGlobe}>
                <Text style={styles.emptyEmoji}>🌍</Text>
              </View>
              <Text style={styles.emptyTitle}>Temukan Cuaca Kotamu</Text>
              <Text style={styles.emptySubtitle}>
                Ketik nama kota di atas untuk{"\n"}melihat kondisi cuaca terkini
              </Text>

              {/* Quick city suggestions */}
              <View style={styles.suggestions}>
                {["Jakarta", "Medan", "Surabaya", "Bali"].map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={styles.suggestionChip}
                    onPress={() => setSearchInput(city)}
                  >
                    <Text style={styles.suggestionText}>{city}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* LOADING */}
          {isLoading && <LoadingSpinner />}

          {/* ERROR */}
          {!isLoading && !!error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorEmoji}>😕</Text>
              <Text style={styles.errorTitle}>Oops!</Text>
              <Text style={styles.errorMessage}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => getWeatherData(searchInput)}
              >
                <Text style={styles.retryText}>Coba Lagi</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* WEATHER CARD */}
          {!isLoading && weatherData && cityInfo && (
            <Animated.View style={{ opacity: cardOpacity }}>
              <WeatherCard
                data={weatherData}
                cityInfo={cityInfo}
                dailyData={dailyData}
              />
              {/* Pull to refresh hint */}
              <Text style={styles.refreshHint}>↓ Tarik untuk refresh</Text>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#f0f4ff",
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    marginTop: 3,
  },

  // Live indicator
  liveDot: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 5,
  },
  liveDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ade80",
  },
  liveText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4ade80",
    letterSpacing: 1,
  },

  scrollContent: { flexGrow: 1, paddingBottom: 40 },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  emptyGlobe: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyEmoji: { fontSize: 52 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f0f4ff",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    lineHeight: 22,
  },

  // Quick suggestions
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 28,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  suggestionText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },

  // Error
  errorContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  errorEmoji: { fontSize: 52, marginBottom: 12 },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f0f4ff",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    textAlign: "center",
    lineHeight: 22,
    backgroundColor: "rgba(239,68,68,0.15)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    overflow: "hidden",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f4ff",
  },

  // Refresh hint
  refreshHint: {
    textAlign: "center",
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    marginTop: 16,
    letterSpacing: 0.3,
  },
});
