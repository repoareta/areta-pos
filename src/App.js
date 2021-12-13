import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSanctum } from "react-sanctum";

import Admin from "./Layouts/Admin";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Home/Dashboard";
import Cashier from "./Pages/Cashier";
import MasterBarang from "./Pages/Inventory/MasterBarang/Index";
import { Create as CreateBarang } from "./Pages/Inventory/MasterBarang/Create";
import { Edit as EditBarang } from "./Pages/Inventory/MasterBarang/Edit";
import Kategori from "./Pages/Inventory/KategoriBarang/Index";
import { Create as CreateKategori } from "./Pages/Inventory/KategoriBarang/Create";
import { Edit as EditKategori } from './Pages/Inventory/KategoriBarang/Edit';
import BarangMasuk from "./Pages/Inventory/BarangMasuk/Index";
import { Create as CreateBarangMasuk } from "./Pages/Inventory/BarangMasuk/Create";
import BarangKeluar from "./Pages/Inventory/BarangKeluar/Index";
import { Create as CreateBarangKeluar } from "./Pages/Inventory/BarangKeluar/Create";
import BarangReject from "./Pages/Inventory/BarangReject/Index";
import { Create as CreateBarangReject } from "./Pages/Inventory/BarangReject/Create";
import BarangRetur from "./Pages/Inventory/BarangRetur/Index";
import { Create as CreateBarangRetur } from "./Pages/Inventory/BarangRetur/Create";
import Konversi from "./Pages/Inventory/Konversi/Index";
import { Create as CreateKonversi } from "./Pages/Inventory/Konversi/Create";
import StockOpname from "./Pages/Inventory/StockOpname/Index";
import { Create as CreateStockOpname } from "./Pages/Inventory/StockOpname/Create";
import Unit from "./Pages/Inventory/Unit/Index";
import { Create as CreateUnit } from "./Pages/Inventory/Unit/Create";
import { Edit as EditUnit } from "./Pages/Inventory/Unit/Edit";
import HargaBeli from "./Pages/Harga/HargaBeli/Index";
import { Create as CreateHargaBeli } from "./Pages/Harga/HargaBeli/Create";
import HargaJual from "./Pages/Harga/HargaJual/Index";
import { Create as CreateHargaJual } from "./Pages/Harga/HargaJual/Create";
import Margin from "./Pages/Harga/Margin/Index";
import { Create as CreateMargin } from "./Pages/Harga/Margin/Create";
import Suppliers from "./Pages/Suppliers/Index";
import { Create as CreateSupplier } from "./Pages/Suppliers/Create";
import { Edit as EditSupplier } from "./Pages/Suppliers/Edit";
import PermintaanBarang from "./Pages/Suppliers/PermintaanBarang/Index";
import { Create as CreatePermintaanBarang } from "./Pages/Suppliers/PermintaanBarang/Create";
import ReturBarang from "./Pages/Suppliers/ReturBarang/Index";
import { Create as CreateReturBarang } from "./Pages/Suppliers/ReturBarang/Create";
import Users from "./Pages/ManajemenAkses/Users/Index";
import { Create as CreateUsers } from "./Pages/ManajemenAkses/Users/Create";
import Roles from "./Pages/ManajemenAkses/Roles/Index";
import { Create as CreateRoles } from "./Pages/ManajemenAkses/Roles/Create";
import Permissions from "./Pages/ManajemenAkses/Permissions/Index";
import { Create as CreatePermission } from "./Pages/ManajemenAkses/Permissions/Create";
import NotFound from "./Pages/Errors/NotFound";
import Blank from "./Pages/Blank";

import { authorized, guest } from "./Util/authHelper";
import { Edit } from "./Pages/ManajemenAkses/Users/Edit";

function App() {
  const { authenticated } = useSanctum();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={guest(<Login />, authenticated)} />
        <Route path="/" element={authorized(<Admin component={<Dashboard />} />, authenticated)} />
        <Route path="inventory">
          <Route path="master-barang" element={authorized(<Admin component={<MasterBarang />} />, authenticated)} />
          <Route path="master-barang/create" element={authorized(<Admin component={<CreateBarang />} />, authenticated)}/>
          <Route path="master-barang/:productId/edit" element={authorized(<Admin component={<EditBarang />} />, authenticated)}/>
          <Route path="kategori-barang" element={authorized(<Admin component={<Kategori />} />, authenticated)}/>
          <Route path="kategori-barang/create" element={authorized(<Admin component={<CreateKategori />} />, authenticated)}/>
          <Route path="kategori-barang/:categoryId/edit" element={authorized(<Admin component={<EditKategori />} />, authenticated)}/>
          <Route path="barang-masuk" element={authorized(<Admin component={<BarangMasuk />} />, authenticated)}/>
          <Route path="barang-masuk/create" element={authorized(<Admin component={<CreateBarangMasuk />} />, authenticated)}/>
          <Route path="barang-keluar" element={authorized(<Admin component={<BarangKeluar />} />, authenticated)}/>
          <Route path="barang-keluar/create" element={authorized(<Admin component={<CreateBarangKeluar />} />, authenticated)}/>
          <Route path="barang-reject" element={authorized(<Admin component={<BarangReject />} />, authenticated)}/>
          <Route path="barang-reject/create" element={authorized(<Admin component={<CreateBarangReject />} />, authenticated)}/>
          <Route path="barang-retur" element={authorized(<Admin component={<BarangRetur />} />, authenticated)}/>
          <Route path="barang-retur/create" element={authorized(<Admin component={<CreateBarangRetur />} />, authenticated)}/>
          <Route path="konversi" element={authorized(<Admin component={<Konversi />} />, authenticated)}/>
          <Route path="konversi/create" element={authorized(<Admin component={<CreateKonversi />} />, authenticated)}/>
          <Route path="stock-opname" element={authorized(<Admin component={<StockOpname />} />, authenticated)}/>
          <Route path="stock-opname/create" element={authorized(<Admin component={<CreateStockOpname />} />, authenticated)}/>
          <Route path="unit" element={authorized(<Admin component={<Unit />} />, authenticated)}/>
          <Route path="unit/create" element={authorized(<Admin component={<CreateUnit />} />, authenticated)}/>
          <Route path="unit/edit/:unitId" element={authorized(<Admin component={<EditUnit />} />, authenticated)}/>
        </Route>
        <Route path="harga">
          <Route path="harga-beli" element={authorized(<Admin component={<HargaBeli />} />, authenticated)}/>
          <Route path="harga-beli/create" element={authorized(<Admin component={<CreateHargaBeli />} />, authenticated)}/>
          <Route path="harga-jual" element={authorized(<Admin component={<HargaJual />} />, authenticated)}/>
          <Route path="harga-jual/create" element={authorized(<Admin component={<CreateHargaJual />} />, authenticated)}/>
          <Route path="margin" element={authorized(<Admin component={<Margin />} />, authenticated)}/>
          <Route path="margin/create" element={authorized(<Admin component={<CreateMargin />} />, authenticated)}/>
        </Route>
        <Route path="supplier">
          <Route path="data-supplier" element={authorized(<Admin component={<Suppliers />} />, authenticated)}/>
          <Route path="data-supplier/create" element={authorized(<Admin component={<CreateSupplier />} />, authenticated)}/>
          <Route path="data-supplier/edit/:supplierId" element={authorized(<Admin component={<EditSupplier />} />, authenticated)}/>
          <Route path="permintaan-barang" element={authorized(<Admin component={<PermintaanBarang />} />, authenticated)}/>
          <Route path="permintaan-barang/create" element={authorized(<Admin component={<CreatePermintaanBarang />} />, authenticated)}/>
          <Route path="retur-barang" element={authorized(<Admin component={<ReturBarang />} />, authenticated)}/>
          <Route path="retur-barang/create" element={authorized(<Admin component={<CreateReturBarang />} />, authenticated)}/>
        </Route>
        <Route path="manajemen-akses">
          <Route path="users" element={authorized(<Admin component={<Users />} />, authenticated)}/>
          <Route path="users/create" element={authorized(<Admin component={<CreateUsers />} />, authenticated)}/>
          <Route path="users/edit/:userId" element={authorized(<Admin component={<Edit />} />, authenticated)}/>
          <Route path="roles" element={authorized(<Admin component={<Roles />} />, authenticated)}/>
          <Route path="roles/create" element={authorized(<Admin component={<CreateRoles />} />, authenticated)}/>
          <Route path="permissions" element={authorized(<Admin component={<Permissions />} />, authenticated)}/>
          <Route path="permissions/create" element={authorized(<Admin component={<CreatePermission />} />, authenticated)}/>
        </Route>
        <Route path="not-set" element={authorized(<Admin component={<Blank />} />, authenticated)} />
        <Route path="cashier" element={authorized(<Admin component={<Cashier />} />, authenticated)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
