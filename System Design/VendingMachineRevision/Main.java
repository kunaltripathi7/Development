package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;
import VendingMachineRevision.enums.ItemType;

public class Main {
    public static void main(String[] args) {
        VendingMachine vm = new VendingMachine();
        fillInventory(vm);

        System.out.println("=== Scenario 1: Select out-of-stock item ===");
        vm.selectItem(103, 1);

        System.out.println("\n=== Scenario 2: Select more than available ===");
        vm.selectItem(101, 10);

        System.out.println("\n=== Scenario 3: Buy 2x LAYS (₹10 each = ₹20) ===");
        vm.selectItem(101, 2);
        vm.insertCoin(Coin.TEN);
        vm.insertCoin(Coin.TEN);

        System.out.println("=== Scenario 4: Buy 1x PEPSI (₹15), pay ₹20, get ₹5 change ===");
        vm.selectItem(102, 1);
        vm.insertCoin(Coin.TWENTY);

        System.out.println("=== Scenario 5: Cancel mid-transaction ===");
        vm.selectItem(101, 1);
        vm.insertCoin(Coin.FIVE);
        vm.cancel();

        System.out.println("\n=== Final Inventory ===");
        displayInventory(vm);
    }

    private static void fillInventory(VendingMachine vm) {
        Inventory inv = vm.getInventory();
        for (int i = 0; i < 5; i++) inv.getShelf(101).addItem(new Item(ItemType.LAYS, 10));
        for (int i = 0; i < 3; i++) inv.getShelf(102).addItem(new Item(ItemType.PEPSI, 15));
        // 103 left empty intentionally (out of stock)
    }

    private static void displayInventory(VendingMachine vm) {
        for (ItemShelf shelf : vm.getInventory().getShelves()) {
            if (shelf.isSoldOut()) {
                System.out.println("Shelf " + shelf.getCode() + ": EMPTY");
            } else {
                Item item = shelf.peek();
                System.out.println("Shelf " + shelf.getCode() + ": " + item.getItemType()
                    + " | ₹" + item.getPrice() + " | Qty: " + shelf.getAvailableCount());
            }
        }
    }
}
