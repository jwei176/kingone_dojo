(() => {
  'use strict';
 
  kintone.events.on('app.record.create.submit', async (event) => {
    const context = event.record.重複禁止項目.value;

    const params = {
      app: 19,
    };

    //RESTAPIでレコードの情報を収得する
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json'), 'GET', params);
    const record_info = resp.records;
    // console.log(resp);
    const record_list = [];
    Object.values(record_info).forEach((ele) => {
      // console.log(ele.重複禁止項目.value);
      record_list.push(ele.重複禁止項目.value);
    });
    console.log(record_list);

    if (record_list.includes(context) === true) {
      //重複してる場合
      const answer = window.confirm('レコードが重複しています。このまま保存しますか？');
      if (answer) {
        //confirmを押すと、eventをreturnし、保存が実行されます。
        return event;
      } else {
        //キャンセルを押すと、保存の処理はしません
        return false;
      }
    } else {
      //重複していない場合
      return event;
    }
  });
})();