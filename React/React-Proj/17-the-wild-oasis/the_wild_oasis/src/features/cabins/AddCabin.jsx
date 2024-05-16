import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
// import CabinTable from "./CabinTable";

// step 1: make the api
function AddCabin() {
  return (
    // won't be making modal.open a button cuz we will lose flexibility.
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* mech. to handle multiple modal windows */}
        {/* <Modal.Open opens="table">
        <Button>Open Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false); // state doesn't belong here -> way to provide modal the way to open/close
//   ideally modal component should contain the button to open and close the modal -> completely reusable. \\\ --> reusability again

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(true)}>Add Cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;

// where did it Start -> making the compo a fully reusable -> should contain the state within -> api -> compo compound pattern -> should support multi window inside the modal -> ultimately make the compo highly reusable and functional
