import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface TimeUnits {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Timebar({
  quitDate,
  color,
}: {
  quitDate: Date;
  color: string;
}) {
  const [timeElapsed, setTimeElapsed] = useState<TimeUnits>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeElapsed = (startDate: Date): TimeUnits => {
    const now = new Date();
    const fDate = new Date(startDate);
    const diffMs = now.getTime() - fDate.getTime();

    let remainingSeconds = Math.floor(diffMs / 1000);

    const years = Math.floor(remainingSeconds / (365.25 * 24 * 60 * 60));
    remainingSeconds %= 365.25 * 24 * 60 * 60;

    const months = Math.floor(remainingSeconds / (30.44 * 24 * 60 * 60));
    remainingSeconds %= 30.44 * 24 * 60 * 60;

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    remainingSeconds %= 24 * 60 * 60;

    const hours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds %= 60 * 60;

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return {
      years: Math.floor(years),
      months: Math.floor(months),
      days: Math.floor(days),
      hours: Math.floor(hours),
      minutes: Math.floor(minutes),
      seconds: Math.floor(seconds),
    };
  };

  useEffect(() => {
    setTimeElapsed(calculateTimeElapsed(quitDate));

    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed(quitDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [quitDate]);

  const getDisplayUnits = () => {
    const { years, months, days, hours, minutes, seconds } = timeElapsed;

    if (years > 0) {
      return [
        { label: "Year", value: years },
        { label: "Month", value: months },
        { label: "Day", value: days },
      ];
    }

    if (months > 0) {
      return [
        { label: "Month", value: months },
        { label: "Day", value: days },
        { label: "Hour", value: hours },
      ];
    }

    if (days > 0) {
      return [
        { label: "Day", value: days },
        { label: "Hour", value: hours },
        { label: "Min", value: minutes },
      ];
    }

    return [
      { label: "Hour", value: hours },
      { label: "Min", value: minutes },
      { label: "Sec", value: seconds },
    ];
  };

  const displayUnits = getDisplayUnits();

  return (
    <View style={styles.timebarContainer}>
      <View style={styles.timeDisplay}>
        {displayUnits.map((unit) => (
          <View key={unit.label} style={styles.timeUnit}>
            <Text style={[styles.timeValue, { color }]}>
              {unit.value.toString().padStart(2, "0")}
            </Text>
            <Text style={styles.timeLabel}>
              {unit.label}
              {unit.value !== 1 ? "s" : ""}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timebarContainer: {
    marginTop: 8,
  },

  timeDisplay: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },

  timeUnit: {
    alignItems: "center",
    flex: 1,
  },

  timeValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },

  timeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
