export function performanceMiddleware(req, res, next) {
  const start = performance.now();

  // Captura a função original de "send"
  const originalSend = res.send;

  res.send = function (body) {
    const end = performance.now();
    const processingTime = end - start;

    // Adiciona header ANTES de enviar
    if (!res.headersSent) {
      res.setHeader("X-Server-Processing-ms", processingTime.toFixed(2));
    }

    console.log(`[PERF] ${req.method} ${req.url} - ${processingTime.toFixed(2)}ms`);

    // Chama o send original
    return originalSend.call(this, body);
  };

  next();
}

