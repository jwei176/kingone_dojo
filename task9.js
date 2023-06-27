(() => {
  'use strict';

  kintone.events.on('app.record.create.submit', async (event) => {
    const context = event.record.重複禁止項目.value;
    const ID = kintone.app.getId();
    const params = {
      app: ID,
    };

    const resp = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', params);
    const record_info = resp.records;
    const record_list = [];
    Object.values(record_info).forEach((ele) => {
      record_list.push(ele.重複禁止項目.value);
    });

    if (record_list.includes(context) === true) {
      const answer = window.confirm('レコードが重複しています。このまま保存しますか？');
      if (!answer) {
        return false;
      }
    }
    return event;
  });
  kintone.events.on('app.record.edit.submit', async (event) => {
    const context = event.record.重複禁止項目.value;
    const ID = kintone.app.getId();
    const record_ID = kintone.app.record.getId();
    const query = `レコード番号 != ${record_ID}`;
    const params = {
      app: ID,
      query: query,
    };

    const resp = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', params);
    const record_info = resp.records;
    const record_list = [];
    Object.values(record_info).forEach((ele) => {
      record_list.push(ele.重複禁止項目.value);
    });

    if (record_list.includes(context) === true) {
      const answer = window.confirm('レコードが重複しています。このまま保存しますか？');
      if (!answer) {
        return false;
      }
    }
    return event;
  });
})();
