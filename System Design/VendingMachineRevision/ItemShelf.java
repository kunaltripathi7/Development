package VendingMachineRevision;

import java.util.ArrayList;
import java.util.List;

public class ItemShelf {
    private final int code;
    private final List<Item> items;

    public ItemShelf(int code) {
        this.code = code;
        this.items = new ArrayList<>();
    }

    public int getCode() { return code; }

    public boolean isSoldOut() { return items.isEmpty(); }

    public int getAvailableCount() { return items.size(); }

    public Item peek() {
        if (isSoldOut()) throw new RuntimeException("Shelf " + code + " is sold out");
        return items.get(0);
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public List<Item> removeItems(int count) {
        if (count > items.size()) {
            throw new RuntimeException("Requested " + count + " but only " + items.size() + " available");
        }
        List<Item> removed = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            removed.add(items.remove(0));
        }
        return removed;
    }
}
