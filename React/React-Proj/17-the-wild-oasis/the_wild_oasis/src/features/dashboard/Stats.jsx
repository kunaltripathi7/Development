import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce(
      // occupation => total nights / total available nights (numDays * numCabins)
      (acc, cur) => acc + cur.numNights,
      0
    ) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="checkins"
        value={checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        value={`${Math.round(occupation * 100)} %`}
        color="blue"
      />
    </>
  );
}

export default Stats;
