import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking(); // handle undefined when react query is loading by returning spinner
  const { isCheckingOut, checkout } = useCheckout();
  const { deleteBookingFn, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkout(bookingId);
            }}
            disabled={isCheckingOut}
          >
            <HiArrowUpOnSquare />
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button
              variation="danger"
              onClick={() => deleteBookingFn(bookingId)}
              disabled={isDeleting}
            >
              <HiTrash />
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={() =>
                deleteBookingFn(bookingId, {
                  onSettled: () => navigate(-1), // onsettled will execute no matter what  happens || mutation function also recieves onSucess handler to apply some operations individually rather than on custom hook.
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
