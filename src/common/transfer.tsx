import type {DataNode} from 'antd/lib/tree';
import type {TransferDirection, TransferItem} from 'antd/es/transfer';
import {Transfer, Tree} from 'antd';

interface TreeTransferProps {
  dataSource: DataNode[];
  targetKeys: string[];
  oneWay?: boolean,
  defaultExpandAll?: boolean,
  onChange: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
}

const isChecked = (selectedKeys: (string | number)[], eventKey: string | number) =>
  selectedKeys.includes(eventKey);

const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
  treeNodes.map(({children, ...props}) => ({
    ...props,
    disabled: checkedKeys.includes(props.key as string),
    children: generateTree(children, checkedKeys),
  }));


const TreeTransfer = ({dataSource, targetKeys, oneWay, defaultExpandAll, ...restProps}: TreeTransferProps) => {
  const transferDataSource: TransferItem[] = [];

  function flatten(list: DataNode[] = []) {
    list.forEach((item) => {
      transferDataSource.push(item as TransferItem);
      flatten(item.children);
    });
  }

  flatten(dataSource);
  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className='tree-transfer'
      render={(item) => item.title!}
      showSelectAll
      oneWay={oneWay}
    >
      {({direction, onItemSelect, onItemSelectAll, selectedKeys}) => {
        const checkedKeys = [...selectedKeys, ...targetKeys];
        if (direction === 'left') {
          return (
            <Tree
              blockNode
              checkable
              defaultExpandAll={defaultExpandAll}
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              // @ts-ignore
              onCheck={(_, {node: {key, children, parent}}) => {
                const checked = !isChecked(checkedKeys, key);
                onItemSelect(key as string, checked);
                const childrens: string[] = [];
                children?.map(value => {
                  childrens.push(String(value.key));
                });
                if (parent != undefined && checked) {
                  let nums = 1;
                  for (const item of parent.children) {
                    if (checkedKeys.includes(item.key)) {
                      nums = nums + 1;
                    }
                  }
                  if (nums == parent.children.length) {
                    childrens.push(String(parent.key));
                  }
                } else if (parent != undefined && !checked) {
                  childrens.push(String(parent.key));
                }
                onItemSelectAll(childrens, checked);
              }}
              onSelect={(_, {node: {key}}) => {
                onItemSelect(key as string, !isChecked(checkedKeys, key));
              }}
            />
          );
        }
        return '';
      }}
    </Transfer>
  );
};

export default TreeTransfer;
