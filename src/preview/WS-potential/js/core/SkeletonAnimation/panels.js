var PANELS = {
  'Asset Manager': `
  <form>

  	<fieldset>
      <legend>Add Asset</legend>

      <label>
      	Type:
        <select name='fetch_type'>

          <option value='assets'>Asset</option>
          <option value='zip'>Zip</option>
          <option value='directory'>Directory</option>

        </select>
      </label>

      <input type='file' style='display: none;' multiple name='fetch_files' />
      <input type='button' value='Browse...' onclick='fetch_files.click();' name='fetch_browse' />
    </fieldset>

  	<fieldset>
        <legend>Manage Assets</legend>

        <label>
        	Search:
        	<input type='text' placeholder='Search term...' name='filter_string' />
        </label>

        <label>
        	Type:
          <select name='filter_type'>

            <option value='any'>Any</option>
            <option value='assets'>Asset</option>
            <option value='folder'>Folder</option>

          </select>
        </label>

        <ul class='item-menu' name='assets_view' />

        <ul>

  	</fieldset>

  </form>`,
  'Asset View': `
  <form>
  	<fieldset>
      <iframe src='' style='resize: none; white-space: pre;  overflow: auto;' name='preview'>No Preview Available</iframe>
      <br>
      <input type='text' placeholder='Asset name...' name='name' />
      <input type='button' value='Rename' onclick='' name='rename' />
    </fieldset>
  	<fieldset name='properties'>
  	</fieldset>
  </form>`,
  'Object Manager': `
  <form>

  	<fieldset>
      <legend>Add Object</legend>

      <label>
      	Name:
        <input type='text' placeholder='New object...' name='create_name'>
      </label>

      <label>
      	Type:
        <select name='create_type'>

          <option value='sprite'>Sprite</option>
          <option value='bone'>Bone</option>
          <option value='group'>Group</option>
          <option value='folder'>Folder</option>

        </select>
      </label>

      <input type='button' value='Create' onclick='' name='create_obj' />
    </fieldset>

  	<fieldset>
        <legend>Manage Objects</legend>

        <label>
        	Search:
        	<input type='text' placeholder='Search term...' name='filter_string' />
        </label>

        <label>
        	Type:
          <select name='filter_type'>

            <option value='any'>Any</option>
            <option value='sprite'>Sprite</option>
            <option value='bone'>Bone</option>
            <option value='group'>Group</option>
            <option value='folder'>Folder</option>

          </select>
        </label>

        <ul class='item-menu' name='objects_view' />

        <ul>

  	</fieldset>

  </form>`,
  'Object View': `
  <form>
  	<fieldset>
      <iframe src='' style='resize: none; white-space: pre;  overflow: auto;' name='preview'>No Preview Available</iframe>
      <br>
      <input type='text' placeholder='Object name...' name='name' />
      <input type='button' value='Rename' onclick='' name='rename' />
    </fieldset>
  	<fieldset name='properties'>
  	</fieldset>
  </form>`
};
