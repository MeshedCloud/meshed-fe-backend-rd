// 接口泛型与函数泛型结合
export interface Convert {
  (value: any): any;
}

export type Struct = {
  id: 'id';
  parent: 'parentId';
  children: 'children';
  parentNode: 'parent';
};

export function toTree<T>(data: T[] | undefined, struct: Struct, convert: Convert | undefined, needParent?: boolean | false) {
  // 空数组
  const result: any[] = [];
  // 判断不是数组  直接返回
  if (!Array.isArray(data)) {
    return result;
  }

  /**
   * map对象的 键: 是每个id  值：对应的item
   * 1: {id: 1, parentId: 0, name: "body"}
   * 2: {id: 2, parentId: 1, name: "title"}
   * 3: {id: 3, parentId: 2, name: "div"}
   */
  const map = new Map();
  data.forEach((item) => {
    // item.parentId 为0时 返回underfined
    if (convert) {
      map.set(item[struct.id], convert(item));
    } else {
      map.set(item[struct.id], item);
    }
  });
  map.forEach((item) => {
    // item.parentId 为0时 返回underfined
    const parent = item[struct.parent] ? map.get(item[struct.parent]) : undefined;

    if (needParent && parent != undefined) {
      item[struct.parentNode] = parent
    }

    if (parent) {
      (parent[struct.children] || (parent[struct.children] = [])).push(item);
    } else {
      // 这里push的item是pid为0的数据
      result.push(item);
    }

  });
  return result;
}
