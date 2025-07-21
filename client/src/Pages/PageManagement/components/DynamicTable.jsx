import React from 'react';
import './DynamicTable.css'; // Nhớ import file CSS
import DynamicButton from './DynamicButton';
import Pagination from './Pagination';

export default function DynamicTable({ columns, data, totalProducts, configButtons, onAction, setCurrentPage, currentPage }) {
  
  return (
    <div className="table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => {
                if (col === 'actions') {
                  return (
                    <td key="actions">
                      {configButtons
                        .filter(btn => ['edit', 'delete'].includes(btn.key))
                        .map(btn => (
                          <DynamicButton
                            key={btn.key}
                            config={btn}
                            onAction={onAction}
                            data={row}
                          >
                            {btn.label}
                          </DynamicButton>
                        ))}
                    </td>
                  );
                } else {
                  return <td key={col}>{row[col]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalProducts={totalProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
