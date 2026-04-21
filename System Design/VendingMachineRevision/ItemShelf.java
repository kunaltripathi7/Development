package VendingMachineRevision;

import VendingMachineRevision.enums.ItemType;

public class ItemShelf {
    private final int code;
    private ItemType itemType;
    private int price;
    private int count;

    public ItemShelf(int code, ItemType itemType, int price, int count) {
        this.code = code;
        this.itemType = itemType;
        this.price = price;
        this.count = count;
    }

    public int getCode() { return code; }
    
    public ItemType getItemType() { return itemType; }
    public void setItemType(ItemType itemType) { this.itemType = itemType; }
    
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    
    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }
}
