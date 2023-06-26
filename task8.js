(() => {
  'use strict';
  kintone.events.on('app.record.create.show', async (event) => {
    const dropdown = [];
    const ID = kintone.app.getId();
    const params = {
      app: ID,
    };
    const resp = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json'), 'GET', params);
    console.log(resp);
    Object.values(resp.properties.Table.fields.Action5.options).forEach((ele) => {
      dropdown.push(ele);
    });

    const sortedAsc = dropdown.sort(
      (objA, objB) => Number(objA.index) - Number(objB.index),
    );

    const arrTable = event.record.Table.value;
    const nullTable = {
      'id': null,
      'value': {
        'Action5': {
          'type': 'DROP_DOWN',
          'value': ''
        },
        '課題': {
          'type': 'MULTI_LINE_TEXT',
          'value': ''
        },
        '状況': {
          'type': 'CHECK_BOX',
          'value': ['未振り返り']
        }
      }
    };

    arrTable.shift();

    Object.keys(dropdown).forEach((i) => {
      arrTable.push(structuredClone(nullTable));
      arrTable[i].value.Action5.value = sortedAsc[i].label;
    });

    return event;
  });
})();