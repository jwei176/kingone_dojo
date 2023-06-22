(() => {
  'use strict';
  kintone.events.on('app.record.create.show', async (event) => {
    const dropdown = [];
    const list = [];
    const params = {
      app: '15',
    };
    kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params, (resp) => {
      console.log(resp.properties);
      Object.values(resp.properties.Table.fields.Action5.options).forEach((ele) => {
        dropdown.push(ele);
      });
      // console.log(dropdown);
      // console.log(event);

      const sortedAsc = dropdown.sort(
        (objA, objB) => Number(objA.index) - Number(objB.index),
      );
      // console.log(sortedAsc);

      for (let i = 0; i < 6; i++) {
        list.push(structuredClone(event.record.Table.value[0]));
        list[i].value.Action5.value = sortedAsc[i].label;
      }

      //listをtableに代入する
      event.record.Table.value = list;
    })
    const resp = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', {'app': 15});
    return event;
  });
})();