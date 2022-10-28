class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  // Name rules
  isQualityGrowingBeforeExpiration() {
    return (
      "Aged Brie" === this.name ||
      "Backstage passes to a TAFKAL80ETC concert" === this.name
    );
  }

  isQualityGrowingAfterExpiration() {
    return "Aged Brie" === this.name;
  }

  isUselessAfterExpiration() {
    return "Backstage passes to a TAFKAL80ETC concert" === this.name;
  }

  isRarerApproachingExpiration() {
    return "Backstage passes to a TAFKAL80ETC concert" === this.name;
  }

  isLegendary() {
    return "Sulfuras, Hand of Ragnaros" === this.name;
  }

  isConjured() {
    return "Conjured Mana Cake" === this.name;
  }

  isStandard() {
    return !this.isQualityGrowingBeforeExpiration() && !this.isLegendary();
  }

  // Quality rules
  canLoseQuality() {
    return 0 < this.quality;
  }

  canGainQuality() {
    return 50 > this.quality;
  }

  // Sell-in rules
  isOutdated() {
    return 0 > this.sellIn;
  }
}
module.exports = {
  Item
};
