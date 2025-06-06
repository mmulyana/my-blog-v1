export const sampleHtmlContent = `
  <h2>Judul</h2>
  <p>
    Ini adalah paragraf yang ditulis menggunakan editor WYSIWYG. 
    Teks ini bisa <strong>tebal</strong> atau <em>miring</em>.
  </p>
  <ul>
    <li>Poin pertama</li>
    <li>Poin kedua</li>
  </ul>
  <p>Berikut adalah contoh blok kode yang perlu di-highlight:</p>
  <pre><code class="language-javascript">
function calculateTotal(items) {
  // Gunakan reduce untuk menjumlahkan harga
  return items.reduce((acc, item) => acc + item.price, 0);
}

const cart = [
  { name: 'Buku', price: 50000 },
  { name: 'Pensil', price: 5000 }
];

console.log('Total harga:', calculateTotal(cart));
  </code></pre>
  <p>Render ini dilakukan dengan aman di server!</p>
`;
