package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

import java.util.List;

public class DispenseState implements VendingMachineState {

    @Override
    public void selectItem(VendingMachine machine, int code, int count) {
        System.out.println("Currently dispensing. Please wait.");
    }

    @Override
    public void insertCoin(VendingMachine machine, Coin coin) {
        System.out.println("Currently dispensing. Please wait.");
    }

    @Override
    public void cancel(VendingMachine machine) {
        System.out.println("Cannot cancel during dispensing.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        int code = machine.getSelectedItemCode();
        int count = machine.getSelectedCount();
        ItemShelf shelf = machine.getInventory().getShelf(code);

        List<Item> dispensed = shelf.removeItems(count);
        int totalPrice = dispensed.get(0).getPrice() * count;
        int change = machine.getCurrentBalance() - totalPrice;

        System.out.println("Dispensed " + count + "x " + dispensed.get(0).getItemType());
        if (change > 0) {
            System.out.println("Returning change: ₹" + change);
        }

        machine.resetTransaction();
        machine.setState(new ReadyState());
        System.out.println("Ready for next transaction.\n");
    }
}
