class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      // Reduce quality for "standard items"
      if (item.canLoseQuality() && item.isStandard()) {
        --item.quality;
        if (item.isConjured()) {
          --item.quality;
        }
      }

      // improve quality for special items
      if (item.canGainQuality() && !item.isStandard()) {
        ++item.quality;
        if (item.isRarerApproachingExpiration()) {
          if (item.canGainQuality() && item.sellIn < 11) {
            ++item.quality;
          }
          if (item.canGainQuality() && item.sellIn < 6) {
            ++item.quality;
          }
        }
      }

      // reduce sellIn
      if (!item.isLegendary()) {
        --item.sellIn;
      }

      if (!item.isOutdated()) {
        continue;
      }

      // handle outdated items
      if (item.isQualityGrowingAfterExpiration() && item.canGainQuality()) {
        ++item.quality;
      }
      if (item.isUselessAfterExpiration()) {
        item.quality = 0;
      }
      if (!item.isLegendary() && item.canLoseQuality()) {
        --item.quality;
        if (item.isConjured()) {
          --item.quality;
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Shop
};
