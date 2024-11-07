// static/admin/cms.js

import CMS from 'netlify-cms-app';
import FileSystemBackend from 'netlify-cms-backend-fs';

// Register the file-system backend
CMS.registerBackend('file-system', FileSystemBackend);

// Initialize the CMS
CMS.init();
