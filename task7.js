(() => {
	'use strict';
    
    
  kintone.events.on('app.record.create.show', async (event) => {
    // console.log(event);
    let date = dayjs(event.record.日付.value).format('YYYYMMDD');
    let dropdown = event.record.サイボウズ製品.value;
    let product = '';
    let manageNO = event.record.管理番号.value;

    //日付のフィールド
    kintone.events.on('app.record.create.change.日付', (event1) => {
        date = dayjs(event1.record.日付.value).format('YYYYMMDD');
        // newdate = dayjs(date).format('YYYYMMDD');
        event1.record.重複禁止項目_文字列.value = `${date}-${product}-${manageNO}`;
        return event1;
    });

    //サイボウズ商品のフィールド
    kintone.events.on('app.record.create.change.サイボウズ製品', (event2) => {
      dropdown = event2.record.サイボウズ製品.value;
      if (dropdown === 'kintone') {
        product = 'KN';
      } else if (dropdown === 'Garoon') {
        product = 'GR';
      } else if (dropdown === 'サイボウズ Office') {
        product = 'OF';
      } else if (dropdown === 'Mailwise') {
        product = 'MW';
      };
      event2.record.重複禁止項目_文字列.value = `${date}-${product}-${manageNO}`;
      return event2;
    });

    //管理番号のフィールド
    kintone.events.on('app.record.create.change.管理番号', (event3) => {
      manageNO = event3.record.管理番号.value;
      event3.record.重複禁止項目_文字列.value = `${date}-${product}-${manageNO}`;
      return event3;
    });

    //update 重複禁止項目_文字列
    event.record.重複禁止項目_文字列.value = `${date}-${product}-${manageNO}`;
  });
})();