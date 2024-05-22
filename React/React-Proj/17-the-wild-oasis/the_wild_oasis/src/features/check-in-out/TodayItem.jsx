import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          as={Link}
          variation="primary"
          size="small"
          to={`/checkin/${id}`}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton />}
    </StyledTodayItem>
  );
}

export default TodayItem;

// as prop changes the html element -> here link so we can pass the to prop.
// Using the Link component ensures that the navigation is handled on the client-side, providing a smooth and efficient user experience without a full page refresh.
// ou should use the Link component when you want to provide declarative navigation links within your application's UI (e.g., navigation menus, buttons with links, etc.). On the other hand, you should use the useNavigate hook when you need to navigate programmatically in response to user actions or other events in your application's logic.
