package VendingMachineRevision;

import VendingMachineRevision.enums.ItemType;

public class Item {
    private final ItemType itemType;
    private final int price;

    public Item(ItemType itemType, int price) {
        this.itemType = itemType;
        this.price = price;
    }

    public ItemType getItemType() { return itemType; }
    public int getPrice() { return price; }
}
