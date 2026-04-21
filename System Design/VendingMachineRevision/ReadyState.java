package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

public class ReadyState implements VendingMachineState {
    
    @Override
    public void selectItem(VendingMachine machine, int code) {
        try {
            ItemShelf shelf = machine.getInventory().getShelf(code);
            if (shelf.getCount() > 0) {
                System.out.println("Item selected: " + shelf.getItemType() + ". Price: " + shelf.getPrice());
                machine.setSelectedItemCode(code);
                machine.setState(new PaymentPendingState());
            } else {
                System.out.println("Error: " + shelf.getItemType() + " is currently out of stock!");
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Override
    public void insertCoin(VendingMachine machine, Coin coin) {
        System.out.println("Please select an item before inserting money!");
    }

    @Override
    public void cancel(VendingMachine machine) {
        System.out.println("No active transaction to cancel.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Please select an item and insert money first.");
    }
}
