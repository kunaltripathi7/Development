package VendingMachineRevision;

public class Inventory {
    private final ItemShelf[] shelves;

    public Inventory(int capacity) {
        this.shelves = new ItemShelf[capacity];
        for (int i = 0; i < capacity; i++) {
            shelves[i] = new ItemShelf(101 + i);
        }
    }

    public ItemShelf getShelf(int code) {
        for (ItemShelf shelf : shelves) {
            if (shelf.getCode() == code) {
                return shelf;
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }

    public ItemShelf[] getShelves() { return shelves; }
}
