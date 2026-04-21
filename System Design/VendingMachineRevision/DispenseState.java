package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

public class DispenseState implements VendingMachineState {

    @Override
    public void selectItem(VendingMachine machine, int code) {
        System.out.println("Please wait. Currently dispensing item.");
    }

    @Override
    public void insertCoin(VendingMachine machine, Coin coin) {
        System.out.println("Please wait. Currently dispensing item.");
    }

    @Override
    public void cancel(VendingMachine machine) {
        System.out.println("Cannot cancel mid-dispense.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        ItemShelf shelf = machine.getInventory().getShelf(machine.getSelectedItemCode());
        int change = machine.getCurrentBalance() - shelf.getPrice();
        
        System.out.println("Dropping item: " + shelf.getItemType());
        shelf.setCount(shelf.getCount() - 1); // Decrease inventory
        
        if (change > 0) {
            System.out.println("Returning change: ₹" + change);
        }
        
        // Reset the machine
        machine.getCoins().clear();
        machine.setSelectedItemCode(-1);
        machine.setState(new ReadyState());
        System.out.println("Vending machine resetting to Ready State. Have a nice day!\n");
    }
}
