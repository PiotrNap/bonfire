import { appContext } from "contexts/contextApi"
import * as React from "react"

import { View, Text, StyleSheet, TextStyle } from "react-native"
import { Colors, Sizing, Typography } from "styles/index"

export interface Props {
  title: string
  children: React.ReactNode
  titleStyle?: TextStyle
  icon?: any
  customStyle?: any
}

export const SettingsItem = ({
  customStyle,
  children,
  title,
  icon,
  titleStyle,
}: Props) => {
  const { colorScheme } = appContext()
  const IconComponent = icon

  return (
    <View style={[styles.container, customStyle]}>
      {icon && (
        <IconComponent
          width={26}
          height={26}
          color={
            colorScheme === "light"
              ? Colors.primary.brand
              : Colors.primary.neutral
          }
          strokeWidth={2}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.navigationItemText,
          {
            color:
              colorScheme === "light"
                ? Colors.primary.s600
                : Colors.neutral.s100,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: Sizing.x20,
  },
  navigationItemText: {
    ...Typography.subHeader.x30,
    width: "80%",
  },
  icon: {
    marginRight: Sizing.x10,
  },
})
