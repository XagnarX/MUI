import csv
import json
from datetime import datetime
from pathlib import Path

def standardize_month(month):
    """标准化月份格式，确保月份是两位数"""
    if not month:
        return month
    parts = month.strip('/').split('/')
    if len(parts) >= 2:
        year = parts[0]
        month = parts[1].zfill(2)  # 将月份补齐为两位数
        return f"{year}/{month}"
    return month

def process_csv_data(csv_path, adjustments_path):
    monthly_data = {}
    summary_data = {}
    
    # 读取利润修正值
    with open(adjustments_path, 'r', encoding='utf-8') as f:
        profit_adjustments = json.load(f)
    
    with open(csv_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)  # 跳过表头行，但不保存
        
        # 处理每一行数据
        for index, row in enumerate(csv_reader):
            if not row or not row[0]:
                continue
                
            # 跳过汇总行和截止行
            if row[0].startswith('仅') or row[0].startswith('截止'):
                continue
                
            date = row[0]
            if not date:
                continue
                
            # 提取并标准化月份格式
            month = standardize_month(date[:7])  # 提取年月并标准化
            
            # 处理每日数据
            daily_data = {
                "key": str(index),
                "date": date,
                "scriptAccount": float(row[1]) if row[1] else 0,
                "scriptConsumption": float(row[2]) if row[2] else 0,
                "gasOracle": float(row[3]) if row[3] else 0,
                "chainGovernance": float(row[4]) if row[4] else 0,
                "sequencers": float(row[5]) if row[5] else 0,
                "rollupConsumption": float(row[6]) if row[6] else 0,
                "l2txfeevalut": float(row[7]) if row[7] else 0,
                "l2txfeevalutFlow": float(row[8]) if row[8] else 0,
                "l2txfeevalutProfit": float(row[9]) if row[9] else 0
            }
            
            if month not in monthly_data:
                monthly_data[month] = []
            monthly_data[month].append(daily_data)
    
    # 计算每个月的汇总数据（包括修正值）
    for month in monthly_data:
        details = monthly_data[month]
        base_profit = sum(d["l2txfeevalutProfit"] for d in details)
        
        # 获取修正值（可以是正数或负数）
        adjustment = profit_adjustments.get(month)
        
        # 添加调试信息
        print(f"处理月份: {month}")
        print(f"基础利润: {base_profit}")
        print(f"修正值: {adjustment}")
        
        # 如果有修正值就应用，否则保持原值
        final_profit = base_profit + adjustment if adjustment is not None else base_profit
        print(f"最终利润: {final_profit}")
        print("-------------------")
        
        summary_data[month] = {
            "scriptConsumption": sum(d["scriptConsumption"] for d in details),
            "chainGovernance": sum(d["chainGovernance"] for d in details),
            "rollupConsumption": sum(d["rollupConsumption"] for d in details),
            "l2txfeevalutProfit": final_profit
        }
    
    # 计算所有月份的总计
    total_summary = {
        "key": "total",
        "month": "总计",
        "scriptConsumption": sum(data["scriptConsumption"] for data in summary_data.values()),
        "chainGovernance": sum(data["chainGovernance"] for data in summary_data.values()),
        "rollupConsumption": sum(data["rollupConsumption"] for data in summary_data.values()),
        "l2txfeevalutProfit": sum(data["l2txfeevalutProfit"] for data in summary_data.values()),
        "isTotal": True
    }
    
    # 构建最终数据结构
    result = []
    
    # 添加月度数据
    for index, (month, details) in enumerate(sorted(monthly_data.items())):
        month_data = {
            "key": str(index),
            "month": month.replace('/', '年') + '月',
            **summary_data[month],
            "details": details
        }
        result.append(month_data)
    
    # 添加总计行
    result.append(total_summary)
    
    return result

def main():
    # 获取脚本所在目录
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    # 设置输入输出路径
    csv_path = project_root / 'src' / 'assets' / 'aa.csv'
    json_path = project_root / 'src' / 'assets' / 'tableData.json'
    adjustments_path = project_root / 'src' / 'assets' / 'profit_adjustments.json'
    
    # 处理数据
    data = process_csv_data(csv_path, adjustments_path)
    
    # 写入 JSON 文件
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f'CSV 转换完成，数据已保存到 {json_path}')

if __name__ == '__main__':
    main() 