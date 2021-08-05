/**
 * @imageUploader
 */

import { registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

/**
 * React Paletter Color Picker
 */

import 'react-color-palette/lib/css/styles.css';

/**
 * perfect-scroll
 */
import 'react-perfect-scrollbar/dist/css/styles.css';

/**
 * React- Editor rich text
 */

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/**
 * React toaster
 */

import 'react-toastify/dist/ReactToastify.css';

/**
 * @config
 *  filepond plugin registration
 */
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);
