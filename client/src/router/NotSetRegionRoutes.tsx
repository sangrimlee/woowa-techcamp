import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PAGE_URL } from 'constants/url.constant';
import RegionSearchpage from 'pages/RegionSearchPage';

export default function NotSetRegionRoutes() {
  return (
    <Routes>
      <Route path={PAGE_URL.HOME} element={<RegionSearchpage backward={false} />} />
      <Route path="*" element={<Navigate to={PAGE_URL.HOME} replace />} />
    </Routes>
  );
}
