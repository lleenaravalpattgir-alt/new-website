async function checkBoth() {
  const urls = [
    'https://ryzeadvisory.co/case-studies/helix-executive-search',
    'https://riseadvisory.lovable.app/case-studies/helix-executive-search'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u);
      const text = await res.text();
      console.log('URL:', u);
      console.log('Status:', res.status);
      console.log('Title:', text.match(/<title>([^<]*)<\/title>/)?.[1]);
      console.log('Contains Case Study Not Found:', text.includes('Case Study Not Found'));
      console.log('Deployment header:', res.headers.get('x-deployment-id'));
    } catch (e) {
      console.error(u, e.message);
    }
  }
}
checkBoth();
