// components/SearchBar.tsx
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  isDay: number;
}

export default function SearchBar({ value, onChangeText, isDay }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          isDay ? styles.dayInput : styles.nightInput,
        ]}
      >
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          style={[styles.input, isDay ? styles.dayText : styles.nightText]}
          placeholder="Cari nama kota..."
          placeholderTextColor={isDay ? "#888" : "#aaa"}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          autoCapitalize="words"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dayInput: { backgroundColor: "rgba(255,255,255,0.9)" },
  nightInput: { backgroundColor: "rgba(255,255,255,0.15)" },
  icon: { fontSize: 18, marginRight: 8 },
  input: { flex: 1, fontSize: 16, fontWeight: "500" },
  dayText: { color: "#333" },
  nightText: { color: "#fff" },
  clearBtn: { fontSize: 16, color: "#888", paddingLeft: 8 },
});
