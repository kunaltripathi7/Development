import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  // to create a side effect useEffect
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  return (
    // return a fragment cuz this will go directly to main ele -> styling
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      {/* return div inside the compo make this clear */}
      <AddCabin />
    </>
  );
}

export default Cabins;
