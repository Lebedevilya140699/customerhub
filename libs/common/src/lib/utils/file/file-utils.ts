import { getGuid } from '@ngrx/data';

import * as fileSaver from 'file-saver';

declare const document: Document;

export class FileUtils {
	public static dataURLtoFile(dataUrl: string, filename: string = getGuid()): File {
		const arr = dataUrl.split(','),
			mime = arr[0].match(/:(.*?);/)?.[1],
			bstr = atob(arr[1]);

		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	}

	/**
	 * Read file as data url (base64) using {@link FileReader.readAsDataURL()}
	 * @param file - File to read as data url (base64)
	 */
	public static readFile(file: Blob): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			try {
				const fileReader = new FileReader();
				fileReader.onload = () => {
					resolve(fileReader.result as string);
				};
				fileReader.readAsDataURL(file);
			} catch (e) {
				reject(e);
			}
		});
	}

	public static download(file: Blob, filename: string): void {
		fileSaver.saveAs(file, filename);
	}
}
