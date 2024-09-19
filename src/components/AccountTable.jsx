import React, { useState } from 'react';

const AccountTable = () => {
  // Hesapları tutan state
  const [accounts, setAccounts] = useState([
    { id: 1, balance: 5000, interestRate: '1%' },
    { id: 2, balance: 10000, interestRate: '1%' },
    { id: 3, balance: 15000, interestRate: '1%' },
    { id: 4, balance: 20000, interestRate: '2%' },
  ]);

  const [isEditing, setIsEditing] = useState(null); // Düzenlenen satırın ID'si
  const [editedAccount, setEditedAccount] = useState({ balance: '', interestRate: '' }); // Güncellenen hesap verileri
  const [isAdding, setIsAdding] = useState(false); // Yeni hesap ekleme durumu
  const [newAccount, setNewAccount] = useState({ balance: '', interestRate: '' }); // Yeni hesap ekleme verileri
  const [error, setError] = useState(''); // Hata mesajı için state

  // Hesap verilerini inputlarda güncelle
  const handleInputChange = (e) => {
    setEditedAccount({
      ...editedAccount,
      [e.target.name]: e.target.value,
    });
  };

  // Yeni hesap verilerini inputlarda güncelle
  const handleNewInputChange = (e) => {
    setNewAccount({
      ...newAccount,
      [e.target.name]: e.target.value,
    });
  };

  // Hesabı kaydet
  const handleSave = (accountId) => {
    if (!editedAccount.balance || !editedAccount.interestRate) {
      setError('Balance and Interest Rate are required!');
      return;
    }
    const updatedAccounts = accounts.map((account) =>
      account.id === accountId ? { ...account, ...editedAccount } : account
    );
    setAccounts(updatedAccounts);
    setIsEditing(null); // Düzenleme işlemi tamamlandıktan sonra sıfırlanır
    setError(''); // Hata mesajını sıfırla
  };

  // Yeni hesap ekleme işlemini kaydet
  const handleSaveNewAccount = () => {
    if (!newAccount.balance || !newAccount.interestRate) {
      setError('Balance and Interest Rate are required!');
      return;
    }
    const newId = accounts.length + 1;
    const accountToAdd = { id: newId, ...newAccount };
    setAccounts([...accounts, accountToAdd]);
    setIsAdding(false); // Yeni hesap ekleme işlemi tamamlandı
    setNewAccount({ balance: '', interestRate: '' }); // Inputları temizle
    setError(''); // Hata mesajını sıfırla
  };

  // Hesap güncelleme işlemini başlat
  const handleUpdate = (account) => {
    if (isAdding) return; // Yeni müşteri ekleme işlemi sırasında Update engellenir
    setIsEditing(account.id); // Düzenlenen satırın ID'sini kaydet
    setEditedAccount({ balance: account.balance, interestRate: account.interestRate }); // Mevcut değerleri inputlara aktar
  };

  // Hesap silme işlemi
  const handleDelete = (accountId) => {
    if (isAdding) return; // Yeni müşteri ekleme işlemi sırasında Delete engellenir
    const updatedAccounts = accounts.filter((account) => account.id !== accountId);
    setAccounts(updatedAccounts);
  };

  // Yeni hesap ekleme işlemini başlat
  const handleAddNewAccount = () => {
    setIsAdding(true);
    setIsEditing(null); // Eğer düzenleme yapılıyorsa onu sıfırla
  };

  // Güncelleme veya yeni hesap ekleme işlemini iptal et
  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setError(''); // Hata mesajını sıfırla
  };

  return (
    <div className="content">
      <h2>View All Accounts</h2>

      {/* Yeni hesap ekleme butonu */}
      {!isAdding && (
        <button className="btn btn-success mb-3" onClick={handleAddNewAccount}>
          Add New Account
        </button>
      )}

      {/* Hata mesajı */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Account Balance</th>
            <th>Interest Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              {isEditing === account.id ? (
                <>
                  {/* Düzenleme modundaysa input alanlarını göster */}
                  <td>{account.id}</td>
                  <td>
                    <input
                      type="text"
                      name="balance"
                      value={editedAccount.balance}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="interestRate"
                      value={editedAccount.interestRate}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleSave(account.id)}
                    >
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {/* Düzenleme modunda değilse normal hücreleri göster */}
                  <td>{account.id}</td>
                  <td>{account.balance}</td>
                  <td>{account.interestRate}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleUpdate(account)}
                      disabled={isAdding} // Yeni müşteri ekleme sırasında Update butonları devre dışı
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(account.id)}
                      disabled={isAdding} // Yeni müşteri ekleme sırasında Delete butonları devre dışı
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}

          {/* Yeni hesap ekleme satırı */}
          {isAdding && (
            <tr>
              <td>New</td>
              <td>
                <input
                  type="text"
                  name="balance"
                  value={newAccount.balance}
                  onChange={handleNewInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="interestRate"
                  value={newAccount.interestRate}
                  onChange={handleNewInputChange}
                  required
                />
              </td>
              <td>
                <button className="btn btn-success me-2" onClick={handleSaveNewAccount}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
