import BigListItemRecycler from '../lib/BigListItemRecycler';
import { BigListItemType } from '../lib/BigListItem';

describe('BigListItemRecycler', () => {
  test('initializes with items', () => {
    const items = [
      { type: BigListItemType.ITEM, section: 0, index: 0, position: 0, height: 50 },
      { type: BigListItemType.ITEM, section: 0, index: 1, position: 50, height: 50 },
    ];

    const recycler = new BigListItemRecycler(items);
    expect(recycler).toBeDefined();
  });

  test('get returns new item when not found', () => {
    const items = [];
    const recycler = new BigListItemRecycler(items);

    const item = recycler.get({
      type: BigListItemType.ITEM,
      position: 0,
      height: 50,
      section: 0,
      index: 0,
    });

    expect(item).toBeDefined();
    expect(item.type).toBe(BigListItemType.ITEM);
    expect(item.key).toBe(-1);
  });

  test('get returns existing item and updates position', () => {
    const items = [
      { type: BigListItemType.ITEM, section: 0, index: 0, position: 0, height: 50, key: 1 },
    ];
    const recycler = new BigListItemRecycler(items);

    const item = recycler.get({
      type: BigListItemType.ITEM,
      position: 100,
      height: 50,
      section: 0,
      index: 0,
    });

    expect(item.position).toBe(100);
    expect(item.key).toBe(1);
  });

  test('fill assigns keys to pending items', () => {
    const items = [];
    const recycler = new BigListItemRecycler(items);

    // Get a new item which becomes pending
    const item1 = recycler.get({
      type: BigListItemType.ITEM,
      position: 0,
      height: 50,
      section: 0,
      index: 0,
    });

    expect(item1.key).toBe(-1);

    recycler.fill();

    // After fill, the item should have a valid key
    expect(item1.key).toBeGreaterThan(0);
  });

  test('fill reuses keys from existing items', () => {
    const items = [
      { type: BigListItemType.ITEM, section: 0, index: 5, position: 250, height: 50, key: 99 },
    ];
    const recycler = new BigListItemRecycler(items);

    // Get a new item
    const newItem = recycler.get({
      type: BigListItemType.ITEM,
      position: 0,
      height: 50,
      section: 0,
      index: 0,
    });

    recycler.fill();

    // The new item should reuse the key from the existing item
    expect(newItem.key).toBe(99);
  });

  test('handles multiple item types', () => {
    const items = [
      { type: BigListItemType.HEADER, section: 0, index: 0, position: 0, height: 60 },
      { type: BigListItemType.ITEM, section: 0, index: 0, position: 60, height: 50 },
      { type: BigListItemType.FOOTER, section: 0, index: 0, position: 110, height: 40 },
    ];

    const recycler = new BigListItemRecycler(items);

    const header = recycler.get({
      type: BigListItemType.HEADER,
      position: 0,
      height: 60,
      section: 0,
      index: 0,
    });

    const item = recycler.get({
      type: BigListItemType.ITEM,
      position: 60,
      height: 50,
      section: 0,
      index: 0,
    });

    const footer = recycler.get({
      type: BigListItemType.FOOTER,
      position: 110,
      height: 40,
      section: 0,
      index: 0,
    });

    expect(header.type).toBe(BigListItemType.HEADER);
    expect(item.type).toBe(BigListItemType.ITEM);
    expect(footer.type).toBe(BigListItemType.FOOTER);
  });

  test('handles section headers and footers', () => {
    const items = [];
    const recycler = new BigListItemRecycler(items);

    const sectionHeader = recycler.get({
      type: BigListItemType.SECTION_HEADER,
      position: 0,
      height: 40,
      section: 0,
      index: 0,
    });

    const sectionFooter = recycler.get({
      type: BigListItemType.SECTION_FOOTER,
      position: 90,
      height: 30,
      section: 0,
      index: 0,
    });

    expect(sectionHeader.type).toBe(BigListItemType.SECTION_HEADER);
    expect(sectionFooter.type).toBe(BigListItemType.SECTION_FOOTER);
  });

  test('fill handles multiple pending items', () => {
    const items = [];
    const recycler = new BigListItemRecycler(items);

    const item1 = recycler.get({
      type: BigListItemType.ITEM,
      position: 0,
      height: 50,
      section: 0,
      index: 0,
    });

    const item2 = recycler.get({
      type: BigListItemType.ITEM,
      position: 50,
      height: 50,
      section: 0,
      index: 1,
    });

    const item3 = recycler.get({
      type: BigListItemType.ITEM,
      position: 100,
      height: 50,
      section: 0,
      index: 2,
    });

    recycler.fill();

    expect(item1.key).toBeGreaterThan(0);
    expect(item2.key).toBeGreaterThan(0);
    expect(item3.key).toBeGreaterThan(0);
    expect(item1.key).not.toBe(item2.key);
    expect(item2.key).not.toBe(item3.key);
  });
});
