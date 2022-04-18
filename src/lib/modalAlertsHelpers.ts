import { Alert, Platform } from "react-native"

const isAndroid = Platform.OS === "android"

export const showFailedModal = (message: string) => {
  Alert.alert(
    "Something went wrong",
    message,
    [
      {
        text: "Close",
        style: "cancel",
        onPress: () => {},
      },
    ],
    isAndroid ? { cancelable: true } : {}
  )
}

export const showCredentialsWarningModal = (onPressCb: () => Promise<void>) => {
  Alert.alert(
    "Beware!",
    "This action is irreversible, you will loose access to your current wallet and account credentials on this device.",
    [
      {
        text: "Yes, I understand",
        style: "destructive",
        onPress: async () => await onPressCb(),
      },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () =>
          Alert.alert(
            "You are safe",
            "None of your credentials were removed. You can continue to enjoy this application."
          ),
      },
    ],
    isAndroid ? { cancelable: true } : {}
  )
}

export const showAccountDeletionWarningModal = (
  onPressCb: () => Promise<void>
) => {
  Alert.alert(
    "Beware!",
    "This action is irreversible, you will loose access to your account.",
    [
      {
        text: "Yes, I understand",
        style: "destructive",
        onPress: async () => await onPressCb(),
      },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () =>
          Alert.alert(
            "Your account is safe!",
            "You can continue to enjoy this application."
          ),
      },
    ],
    isAndroid ? { cancelable: true } : {}
  )
}
