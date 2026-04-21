package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;
import VendingMachineRevision.enums.ItemType;

public class Main {
    public static void main(String[] args) {
        VendingMachine vm = new VendingMachine();

        // 1. Initialize Inventory
        Inventory inventory = vm.getInventory();
        inventory.setShelf(0, new ItemShelf(101, ItemType.LAYS, 10, 5));
        inventory.setShelf(1, new ItemShelf(102, ItemType.PEPSI, 15, 2));
        inventory.setShelf(2, new ItemShelf(103, ItemType.CHOCOLATE, 20, 0)); // Out of stock

        System.out.println("--- Starting Vending Machine Flow ---");

        // Scenario 1: Select out of stock item
        vm.selectItem(103);

        System.out.println("\n---");

        // Scenario 2: Select Pepsi and pay exact amount
        vm.selectItem(102);
        vm.insertCoin(Coin.TEN);
        vm.insertCoin(Coin.FIVE); // Will auto-dispense since it reaches Rs 15

        System.out.println("---");

        // Scenario 3: User cancels transaction
        vm.selectItem(101); // User selects Lays (Rs 10)
        vm.insertCoin(Coin.FIVE);
        vm.cancel(); // User changes mind
    }
}
