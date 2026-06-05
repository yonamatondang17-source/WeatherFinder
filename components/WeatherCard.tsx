// components/WeatherCard.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import {
    getWeatherInfo,
    getWindDirection,
} from "../constants/utils/weatherHelper";

const { width } = Dimensions.get("window");

interface Props {
  data: any;
  cityInfo: any;
  dailyData: any;
}

function StatBox({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: string;
  value: string;
  label: string;
  delay?: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.statBox,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

export default function WeatherCard({ data, cityInfo, dailyData }: Props) {
  const { temperature, weathercode, windspeed, winddirection, is_day } = data;
  const { label, emoji } = getWeatherInfo(weathercode, is_day);
  const windDir = getWindDirection(winddirection);

  const tempAnim = useRef(new Animated.Value(0)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(tempAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const gradientColors: [string, string, string] = is_day
    ? ["#1a2a4a", "#1e3a5f", "#0f2035"]
    : ["#0a0e1a", "#111827", "#070b14"];

  const accentColor = is_day ? "#5b9bd5" : "#7c6de8";

  const maxTemp = dailyData
    ? Math.round(dailyData.temperature_2m_max[0])
    : "--";
  const minTemp = dailyData
    ? Math.round(dailyData.temperature_2m_min[0])
    : "--";
  const rain = dailyData
    ? `${(dailyData.precipitation_sum?.[0] ?? 0).toFixed(1)}mm`
    : "--";
  const sunrise = dailyData?.sunrise?.[0]
    ? dailyData.sunrise[0].slice(-5)
    : "--:--";
  const sunset = dailyData?.sunset?.[0]
    ? dailyData.sunset[0].slice(-5)
    : "--:--";

  return (
    <LinearGradient colors={gradientColors} style={styles.card}>
      {/* Decorative orb */}
      <View style={[styles.orb, { backgroundColor: accentColor }]} />

      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerAnim }]}>
        <View>
          <Text style={styles.cityName}>{cityInfo.name}</Text>
          <Text style={styles.countryName}>
            {cityInfo.admin1 ? `${cityInfo.admin1}, ` : ""}
            {cityInfo.country}
          </Text>
        </View>
        <View style={[styles.badge, { borderColor: accentColor + "66" }]}>
          <Text style={styles.badgeText}>
            {is_day ? "☀️ Siang" : "🌙 Malam"}
          </Text>
        </View>
      </Animated.View>

      {/* Temperature hero */}
      <Animated.View style={[styles.heroRow, { opacity: tempAnim }]}>
        <View>
          <Text style={styles.tempText}>{Math.round(temperature)}°</Text>
          <Text style={[styles.conditionText, { color: accentColor }]}>
            {emoji} {label}
          </Text>
        </View>
        <View style={styles.tempRange}>
          <View style={styles.tempRangeItem}>
            <Text style={styles.tempRangeIcon}>▲</Text>
            <Text style={styles.tempRangeValue}>{maxTemp}°</Text>
            <Text style={styles.tempRangeLabel}>Maks</Text>
          </View>
          <View
            style={[
              styles.tempDivider,
              { backgroundColor: accentColor + "44" },
            ]}
          />
          <View style={styles.tempRangeItem}>
            <Text style={styles.tempRangeIcon}>▼</Text>
            <Text style={styles.tempRangeValue}>{minTemp}°</Text>
            <Text style={styles.tempRangeLabel}>Min</Text>
          </View>
        </View>
      </Animated.View>

      {/* Separator line with accent */}
      <View style={styles.separator}>
        <View
          style={[styles.separatorAccent, { backgroundColor: accentColor }]}
        />
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <StatBox
          icon="💨"
          value={`${windspeed}`}
          label={`km/j · ${windDir}`}
          delay={100}
        />
        <StatBox icon="🌧️" value={rain} label="Hujan" delay={180} />
        <StatBox icon="🌅" value={sunrise} label="Sunrise" delay={260} />
        <StatBox icon="🌇" value={sunset} label="Sunset" delay={340} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 28,
    padding: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  // decorative background orb
  orb: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -60,
    right: -50,
    opacity: 0.08,
  },

  // header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  cityName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f0f4ff",
    letterSpacing: 0.3,
  },
  countryName: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    marginTop: 3,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  badgeText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },

  // hero temperature row
  heroRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tempText: {
    fontSize: 88,
    fontWeight: "200",
    color: "#ffffff",
    letterSpacing: -4,
    lineHeight: 92,
  },
  conditionText: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 4,
    letterSpacing: 0.2,
  },

  // max/min temperature
  tempRange: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  tempRangeItem: { alignItems: "center", minWidth: 40 },
  tempRangeIcon: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 2,
  },
  tempRangeValue: { fontSize: 20, fontWeight: "600", color: "#f0f4ff" },
  tempRangeLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
  tempDivider: { width: 1, height: 32, opacity: 0.5 },

  // separator
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginBottom: 20,
    overflow: "hidden",
  },
  separatorAccent: {
    width: 60,
    height: "100%",
    opacity: 0.6,
  },

  // stats grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statBox: {
    flex: 1,
    minWidth: (width - 32 - 48 - 30) / 4,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  statIcon: { fontSize: 20, marginBottom: 6 },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#f0f4ff",
    letterSpacing: 0.2,
  },
  statLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginTop: 3,
    textAlign: "center",
  },
});
