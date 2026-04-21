package VendingMachineRevision;

// Inventory manages a fixed number of ItemShelves (slots)
public class Inventory {
    private final ItemShelf[] shelves;

    public Inventory(int capacity) {
        this.shelves = new ItemShelf[capacity];
    }

    public void setShelf(int index, ItemShelf shelf) {
        if (index >= 0 && index < shelves.length) {
            this.shelves[index] = shelf;
        }
    }

    public ItemShelf getShelf(int code) {
        for (ItemShelf shelf : shelves) {
            if (shelf != null && shelf.getCode() == code) {
                return shelf;
            }
        }
        throw new IllegalArgumentException("Invalid code number: " + code);
    }
}
