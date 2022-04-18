import * as React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import {
  appContext,
  bookingContext,
  eventCreationContext,
} from "contexts/contextApi"
import { LeftArrowIcon } from "assets/icons"
import { Colors, Sizing, Typography } from "styles/index"
import { FullWidthButton } from "components/buttons/fullWidthButton"
import { EventConfirmationDetails } from "components/booking"
import { ProfileContext } from "contexts/profileContext"
import { Events } from "Api/Events"
import { CreateEventDto } from "common/types/dto/create-event.dto"

export const DetailedConfirmation = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { timeBlockCostADA: hourlyRate } = React.useContext(ProfileContext)
  const { colorScheme } = appContext()
  const {
    textContent,
    selectedDays,
    tags,
    fromDate,
    toDate,
    hourlyRate: eventHourlyRate,
    imageURI,
    privateEvent,
    eventCardColor,
    eventTitleColor,
    availabilities,
  } = eventCreationContext()
  const { duration, pickedDate, previewingEvent } = bookingContext()
  const { username, id } = React.useContext(ProfileContext)
  const params = route?.params
  const isLightMode = colorScheme === "light"

  const onBackNavigationPress = () => navigation.goBack()
  const onButtonPress = async () => {
    setIsLoading(true)

    if (params?.isNewEvent) {
      const newEvent: CreateEventDto = {
        title: textContent.title,
        description: textContent.description,
        availabilities,
        selectedDays,
        tags,
        fromDate,
        toDate,
        hourlyRate: hourlyRate ?? eventHourlyRate,
        privateEvent,
        eventCardColor,
        eventTitleColor,
        organizer: {
          id,
          username,
        },
      }

      try {
        const eventId = await Events.createEvent(newEvent)

        if (eventId) {
          // update img as we cant send multiple content-type headers
          const success = await Events.uploadEventImage(imageURI, eventId)

          if (success) {
            setIsLoading(false)

            navigation.navigate("Confirmation", {
              isBookingConfirmation: false,
            })
          }
        }
      } catch (e) {
        setIsLoading(false)
        console.error(e)
      }
    } else {
      try {
        const res = await Events.bookEvent({
          eventId: previewingEvent.id,
          bookedDate: new Date(pickedDate),
          bookedDuration: duration,
        })

        if (res) {
          navigation.navigate("Confirmation", {
            isBookingConfirmation: true,
          })
        }
      } catch (e) {
        console.error(e)
        setIsLoading(false)
      }

      //@TODO submit transaction to blockchain
    }
  }
  const onDeleteEvent = async () => {
    if (!params.organizerEvent.eventId) return
    try {
      const success = await Events.deleteEvent(params.organizerEvent.eventId)
      //TODO show success modal
      console.log(success)
    } catch (e) {}
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isLightMode
            ? Colors.primary.neutral
            : Colors.neutral.s600,
        },
      ]}>
      <View style={styles.container}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <View style={styles.header}>
          <Text
            style={
              isLightMode ? styles.headerText_light : styles.headerText_dark
            }>
            {params?.header || "Confirmation"}
          </Text>
        </View>
        <EventConfirmationDetails
          organizerEvent={params?.organizerEvent}
          isNewEvent={params?.isNewEvent}
        />
        <View style={styles.buttonContainer}>
          {params?.organizerEvent ? (
            // @TODO this should only be possible if there're no bookings
            <FullWidthButton
              onPressCallback={onDeleteEvent}
              text="Close"
              colorScheme={colorScheme}
              loadingIndicator={isLoading}
              textStyle={{ color: Colors.primary.neutral }}
              style={{
                backgroundColor: Colors.danger.s400,
                borderColor: Colors.danger.s400,
              }}
            />
          ) : (
            <FullWidthButton
              onPressCallback={onButtonPress}
              text={"Confirm"}
              colorScheme={colorScheme}
              loadingIndicator={isLoading}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "90%",
    flex: 1,
  },
  navigation: {
    flexDirection: "row",
    marginVertical: Sizing.x15,
    alignSelf: "flex-start",
  },
  header: {
    alignSelf: "flex-start",
  },
  headerText_light: {
    ...Typography.header.x50,
    color: Colors.primary.s800,
  },
  headerText_dark: {
    ...Typography.header.x50,
    color: Colors.primary.neutral,
  },
  detailsWrapper: {
    flex: 1,
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: Sizing.x15,
  },
})
