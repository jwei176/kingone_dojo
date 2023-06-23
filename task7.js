(() => {
  'use strict';
  const fields = ['app.record.create.change.日付', 'app.record.create.change.サイボウズ製品', 'app.record.create.change.管理番号'];

  kintone.events.on(['app.record.create.show'], async (event) => {
    console.log(event);
    let product = '';
    let manageNO = event.record.管理番号.value;
    let date = dayjs(event.record.日付.value).format('YYYYMMDD');
    let dropdown = event.record.サイボウズ製品.value;
    event.record.重複禁止項目_文字列.value = `${date}-${product}-${manageNO}`;


    await kintone.events.on(fields, (event) => {

      date = dayjs(event.record.日付.value).format('YYYYMMDD');

      dropdown = event.record.サイボウズ製品.value;
      if (dropdown === 'kintone') {
        product = 'KN';
      } else if (dropdown === 'Garoon') {
        product = 'GR';
      } else if (dropdown === 'サイボウズ Office') {
        product = 'OF';
      } else if (dropdown === 'Mailwise') {
        product = 'MW';
      }

      manageNO = event.record.管理番号.value;
      event.record.重複禁止項目_文字列.value = `${date}-${product}-${manageNO}`;
      return event;
    });

    event.record.重複禁止項目_文字列.disabled = true;
    return event;
  });
})();