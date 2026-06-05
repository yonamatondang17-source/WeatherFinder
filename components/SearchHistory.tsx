// components/SearchHistory.tsx
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  history: string[];
  onSelect: (city: string) => void;
}

export default function SearchHistory({ history, onSelect }: Props) {
  if (history.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕐 Riwayat</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {history.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chip}
            onPress={() => onSelect(city)}
          >
            <Text style={styles.chipText}>{city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 8 },
  title: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
    fontWeight: "600",
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  chipText: { color: "#fff", fontSize: 13, fontWeight: "500" },
});
