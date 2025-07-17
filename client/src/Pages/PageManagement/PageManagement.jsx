import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { pagesConfig } from './pageConfigs/pagesConfig';
import DynamicTable from './components/DynamicTable';
import DynamicForm from './components/DynamicForm';
import DynamicButton from './components/DynamicButton';

export default function PageManagement() {
  const { pageKey } = useParams();
  const config = pagesConfig[pageKey];

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});

  const loadData = async () => {
    const res = await axios.get(config.table.fetchUrl, config.authHeader);
    setData(res.data.products || null);
  };

  const handleSubmit = async () => {
    await axios({
      method: config.form.method || 'POST',
      url: config.form.submitUrl,
      data: formData,
      ...config.authHeader,
    });
    setFormData({});
    loadData();
  };

  const handleButtonAction = (actionKey) => {
    switch (actionKey) {
      case 'openFormModal':
        // setShowModal(true);
        break;
      case 'refreshTableData':
        // fetchData();
        break;
      case 'exportToExcel':
        // exportToExcelFunction();
        break;
      default:
        console.warn(`Unknown action: ${actionKey}`);
    }
  };


  useEffect(() => {
    loadData();
  }, [pageKey]);

  return (
    <div>
      <h2>{config.title}</h2>
      <DynamicTable columns={config.table.columns} data={data} />
      <DynamicForm
        fields={config.form.fields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
      {config.buttons?.map((btn) => (
        <DynamicButton key={btn.key} config={btn} onAction={handleButtonAction} />
      ))}
    </div>
  );
}
