import React from 'react';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import tableData from '../assets/tableData.json';
import assetData from '../assets/a.json';

// 数据接口定义
interface ExpandedDataType {
  key: React.Key;
  date: string;
  scriptAccount: number;
  scriptConsumption: number;
  gasOracle: number;
  chainGovernance: number;
  sequencers: number;
  rollupConsumption: number;
  l2txfeevalut: number;
  l2txfeevalutFlow: number;
  l2txfeevalutProfit: number;
}

interface DataType {
  key: React.Key;
  month: string;
  scriptConsumption: number;
  chainGovernance: number;
  rollupConsumption: number;
  l2txfeevalut: number;
  l2txfeevalutFlow: number;
  l2txfeevalutProfit: number;
  details?: ExpandedDataType[];
  isTotal?: boolean;
  isHeader?: boolean;  // 添加这个字段以匹配数据类型
  columns?: string[];  // 添加这个字段以匹配数据类型
}

// 添加资产表格的接口定义
interface AssetDataType {
  key: string;
  date: string;
  amount: number;
}

// 列定义
const expandColumns: TableColumnsType<ExpandedDataType> = [
  { title: '日期', dataIndex: 'date', key: 'date', fixed: 'left' },
  { title: '脚本账户', dataIndex: 'scriptAccount', key: 'scriptAccount' },
  { 
    title: '脚本日消耗', 
    dataIndex: 'scriptConsumption', 
    key: 'scriptConsumption',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'Gas Oracle', 
    dataIndex: 'gasOracle', 
    key: 'gasOracle',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: '链治理日消耗', 
    dataIndex: 'chainGovernance', 
    key: 'chainGovernance',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'Sequencers', 
    dataIndex: 'sequencers', 
    key: 'sequencers',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'Rollup日消耗', 
    dataIndex: 'rollupConsumption', 
    key: 'rollupConsumption',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'L2交易费', 
    dataIndex: 'l2txfeevalut', 
    key: 'l2txfeevalut',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'L2交易费流水', 
    dataIndex: 'l2txfeevalutFlow', 
    key: 'l2txfeevalutFlow',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'L2交易费日利润', 
    dataIndex: 'l2txfeevalutProfit', 
    key: 'l2txfeevalutProfit',
    render: (value: number) => (
      <span style={{ color: value >= 0 ? 'green' : 'red' }}>
        {value !== undefined ? value.toFixed(4) : '-'}
      </span>
    )
  }
];

const columns: TableColumnsType<DataType> = [
  { title: '月份', dataIndex: 'month', key: 'month', fixed: 'left' },
  { 
    title: '脚本日消耗', 
    dataIndex: 'scriptConsumption', 
    key: 'scriptConsumption',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: '链治理日消耗', 
    dataIndex: 'chainGovernance', 
    key: 'chainGovernance',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'Rollup日消耗', 
    dataIndex: 'rollupConsumption', 
    key: 'rollupConsumption',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'L2交易费流水', 
    dataIndex: 'l2txfeevalutFlow', 
    key: 'l2txfeevalutFlow',
    render: (value: number) => value !== undefined ? value.toFixed(4) : '-'
  },
  { 
    title: 'L2交易费日利润', 
    dataIndex: 'l2txfeevalutProfit', 
    key: 'l2txfeevalutProfit',
    render: (value: number) => (
      <span style={{ color: value >= 0 ? 'green' : 'red' }}>
        {value !== undefined ? value.toFixed(4) : '-'}
      </span>
    )
  }
];

const expandedRowRender = (record: DataType) => (
  <Table<ExpandedDataType>
    columns={expandColumns}
    dataSource={record.details}
    pagination={false}
    scroll={{ x: 1500 }}
  />
);

// 资产表格的列定义
const assetColumns: TableColumnsType<AssetDataType> = [
  { 
    title: '日期', 
    dataIndex: 'date', 
    key: 'date',
    render: (text: string) => text.replace('截止 ', '').replace(' 总剩余资产', '')
  },
  { 
    title: '总剩余资产', 
    dataIndex: 'amount', 
    key: 'amount',
    render: (value: number) => value.toFixed(4)
  }
];

// 转换资产数据为表格数据
const assetTableData: AssetDataType[] = Object.entries(assetData).map(([key, value]) => ({
  key: key,
  date: key,
  amount: value
}));

const ExpandTable: React.FC = () => {
  // 过滤出数据和总计行，不再需要表头
  const totalRow = tableData.find(item => item.isTotal) as DataType;  // 添加类型断言
  const monthlyData = tableData.filter(item => !item.isHeader && !item.isTotal) as DataType[];  // 添加类型断言

  // 计算每月汇总时处理所有数值字段的精度
  const processedMonthlyData = monthlyData.map(month => {
    // 如果已经计算过，返回原始数据
    if (month.l2txfeevalutFlow !== undefined) {
      return {
        ...month,
        scriptConsumption: Number(month.scriptConsumption.toFixed(4)),
        chainGovernance: Number(month.chainGovernance.toFixed(4)),
        rollupConsumption: Number(month.rollupConsumption.toFixed(4)),
        l2txfeevalutFlow: Number(month.l2txfeevalutFlow.toFixed(4)),
        l2txfeevalutProfit: Number(month.l2txfeevalutProfit.toFixed(4))
      };
    }
    
    // 否则，从详情数据中计算
    if (month.details && month.details.length > 0) {
      const sumL2TxFeeValutFlow = month.details.reduce((sum, day) => {
        return sum + (day.l2txfeevalutFlow || 0);
      }, 0);
      
      return {
        ...month,
        scriptConsumption: Number(month.scriptConsumption.toFixed(4)),
        chainGovernance: Number(month.chainGovernance.toFixed(4)),
        rollupConsumption: Number(month.rollupConsumption.toFixed(4)),
        l2txfeevalutFlow: Number(sumL2TxFeeValutFlow.toFixed(4)),
        l2txfeevalutProfit: Number(month.l2txfeevalutProfit.toFixed(4))
      };
    }
    
    return {
      ...month,
      scriptConsumption: Number(month.scriptConsumption.toFixed(4)),
      chainGovernance: Number(month.chainGovernance.toFixed(4)),
      rollupConsumption: Number(month.rollupConsumption.toFixed(4)),
      l2txfeevalutProfit: Number(month.l2txfeevalutProfit.toFixed(4))
    };
  });

  // 处理总计行的精度
  let processedTotalRow = totalRow;
  if (totalRow) {
    const totalL2TxFeeValutFlow = processedMonthlyData.reduce((sum, month) => {
      return sum + (month.l2txfeevalutFlow || 0);
    }, 0);
    
    processedTotalRow = {
      ...totalRow,
      scriptConsumption: Number(totalRow.scriptConsumption.toFixed(4)),
      chainGovernance: Number(totalRow.chainGovernance.toFixed(4)),
      rollupConsumption: Number(totalRow.rollupConsumption.toFixed(4)),
      l2txfeevalutFlow: totalRow.l2txfeevalutFlow !== undefined ? 
        Number(totalRow.l2txfeevalutFlow.toFixed(4)) : 
        Number(totalL2TxFeeValutFlow.toFixed(4)),
      l2txfeevalutProfit: Number(totalRow.l2txfeevalutProfit.toFixed(4))
    };
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%',
      flex: 1,
      gap: '24px'
    }}>
      <div>
        <h2 style={{ 
          margin: '16px 0',
          padding: '0 16px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Morph 营收细节
        </h2>
        <Table<DataType>
          columns={columns}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => !record.isTotal
          }}
          dataSource={[...processedMonthlyData, ...(processedTotalRow ? [processedTotalRow] : [])]}
          scroll={{ x: 1200 }}
          pagination={false}
          style={{ flex: 1 }}
          rowClassName={(record) => record.isTotal ? 'total-row' : ''}
        />
      </div>

      <div>
        <h2 style={{ 
          margin: '16px 0',
          padding: '0 16px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          剩余资产统计
        </h2>
        <Table<AssetDataType>
          columns={assetColumns}
          dataSource={assetTableData}
          pagination={false}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};

// 添加总计行的样式
const style = document.createElement('style');
style.innerHTML = `
  .total-row {
    background-color: #fafafa;
    font-weight: bold;
  }
  .total-row:hover > td {
    background-color: #f0f0f0 !important;
  }
`;
document.head.appendChild(style);

export default ExpandTable; 