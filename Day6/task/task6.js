(() => {
  'use strict';
  kintone.events.on('app.record.create.show', (event) => {
    const list = [];
    const Action = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];
    console.log(event);
    //６つのnullフィールドを作成し、Action5+1のコンテントを入れる
    for (let i = 0; i < 6; i++) {
      list.push(structuredClone(event.record.Table.value[0]));
      list[i].value.Action5.value = Action[i];
    }

    //listをtableに代入する
    event.record.Table.value = list;

    return event;

  });
})();