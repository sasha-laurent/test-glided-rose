const { Shop } = require("../src/gilded_rose");
const { Item } = require("../src/item");

// "unit" tests by item type
describe("Standard items", () => {
  it("should lose 1 quality & sellIn every update", () => {
    // Given
    const item = new Item("+5 Dexterity Vest", 10, 20);
    const shop = new Shop([item]);

    // When
    const updatedItems = shop.updateQuality();

    // Then
    expect(updatedItems[0].name).toBe("+5 Dexterity Vest");
    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(19);
  });
  it("should never have negative quality", () => {
    // Given
    const item = new Item("+5 Dexterity Vest", 10, 0);
    const shop = new Shop([item]);

    // When
    const updatedItems = shop.updateQuality();

    // Then
    expect(updatedItems[0].name).toBe("+5 Dexterity Vest");
    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(0);
  });
  it("should lose 2 quality if outdated", () => {
    // Given
    const item = new Item("+5 Dexterity Vest", 0, 5);
    const shop = new Shop([item]);

    // When
    const updatedItems = shop.updateQuality();

    // Then
    expect(updatedItems[0].name).toBe("+5 Dexterity Vest");
    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[0].quality).toBe(3);
  });
});

// main/"integration" test
describe("Gilded Rose", function () {
  it("should integrate multiple items", function () {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];

    const gildedRose = new Shop(items);

    // Update once
    const updatedItems = gildedRose.updateQuality();
    // standard Items
    expect(updatedItems[0].name).toBe("+5 Dexterity Vest");
    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(19);

    expect(updatedItems[2].name).toBe("Elixir of the Mongoose");
    expect(updatedItems[2].sellIn).toBe(4);
    expect(updatedItems[2].quality).toBe(6);
    // Aged Brie
    expect(updatedItems[1].name).toBe("Aged Brie");
    expect(updatedItems[1].sellIn).toBe(1);
    expect(updatedItems[1].quality).toBe(1);

    // Backstage
    expect(updatedItems[5].name).toBe(
      "Backstage passes to a TAFKAL80ETC concert"
    );
    expect(updatedItems[5].sellIn).toBe(14);
    expect(updatedItems[5].quality).toBe(21);

    expect(updatedItems[6].name).toBe(
      "Backstage passes to a TAFKAL80ETC concert"
    );
    expect(updatedItems[6].sellIn).toBe(9);
    expect(updatedItems[6].quality).toBe(27);

    expect(updatedItems[7].name).toBe(
      "Backstage passes to a TAFKAL80ETC concert"
    );
    expect(updatedItems[7].sellIn).toBe(4);
    expect(updatedItems[7].quality).toBe(43);

    // Legendary
    expect(updatedItems[3].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(updatedItems[3].sellIn).toBe(0);
    expect(updatedItems[3].quality).toBe(80);

    expect(updatedItems[4].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(updatedItems[4].sellIn).toBe(-1);
    expect(updatedItems[4].quality).toBe(80);

    // Conjured
    expect(updatedItems[8].name).toBe("Conjured Mana Cake");
    expect(updatedItems[8].sellIn).toBe(2);
    expect(updatedItems[8].quality).toBe(4);
  });
});
