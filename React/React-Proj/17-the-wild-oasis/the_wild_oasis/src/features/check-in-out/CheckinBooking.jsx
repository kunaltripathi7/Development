import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useCheckin();

  const { booking, isLoading } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const [confirmPaid, setConfirmPaid] = useState(false); // can't provide default value cuz that value isn't defined when compo mounts -> useEffect to set that. || when the data is received all compo rerenders which are consuming the react query hook.
  const [addBreakfast, setAddBreakfast] = useState(false);
  useEffect(
    // if u do this via derived state -> will get false val on rerender
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking?.isPaid]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;

  let {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (hasBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          extrasPrice: optionalBreakfastPrice,
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false); // cuz as the user adds breakfast need to do the payment -> functionality +++
          }}
          checked={addBreakfast}
          disabled={hasBreakfast}
          id="breakfast"
        >
          Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          id="confirm"
          onChange={() => setConfirmPaid((value) => !value)}
          checked={confirmPaid}
          disabled={isCheckingIn || confirmPaid}
        >
          I confirm that {guests.fullName} has paid the full amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : `${formatCurrency(totalPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
          {/* accessibility -> button */}
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
