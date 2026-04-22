package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

public class ReadyState implements VendingMachineState {

    @Override
    public void selectItem(VendingMachine machine, int code, int count) {
        try {
            ItemShelf shelf = machine.getInventory().getShelf(code);

            if (shelf.isSoldOut()) {
                System.out.println("Error: Shelf " + code + " is sold out!");
                return;
            }

            if (count > shelf.getAvailableCount()) {
                System.out.println("Error: Requested " + count + " but only " + shelf.getAvailableCount() + " available.");
                return;
            }

            if (count <= 0) {
                System.out.println("Error: Count must be at least 1.");
                return;
            }

            Item item = shelf.peek();
            int totalPrice = item.getPrice() * count;
            System.out.println("Selected " + count + "x " + item.getItemType() + " | Unit: ₹" + item.getPrice() + " | Total: ₹" + totalPrice);
            machine.storeSelection(code, count);
            machine.setState(new PaymentPendingState());
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Override
    public void insertCoin(VendingMachine machine, Coin coin) {
        System.out.println("Please select an item first.");
    }

    @Override
    public void cancel(VendingMachine machine) {
        System.out.println("No active transaction to cancel.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Please select an item and pay first.");
    }
}
