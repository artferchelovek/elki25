import os

if not os.environ.get('ELKI-DBURL'):
    database_url="sqlite+aiosqlite:///backend\\db\\app.db"
else:
    database_url=os.environ.get('ELKI-DBURL')

if not os.environ.get('ELKI-FILEDIR'):
    file_dir = 'backend/files'
else:
    file_dir=os.environ.get('ELKI-FILEDIR')