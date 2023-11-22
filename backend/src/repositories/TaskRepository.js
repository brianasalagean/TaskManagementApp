const sql = require('mssql/msnodesqlv8');

class TaskRepository {
  async getAllTasks() {
    const request = new sql.Request();

    try {
      const result = await request.query('SELECT * FROM tasks');
      return result.recordset;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(name, isCompleted) {
    const request = new sql.Request();
    request.input('name', sql.NVarChar, name);
    request.input('isCompleted', sql.Bit, isCompleted === true);

    try {
      await request.query('INSERT INTO tasks (name, isCompleted) VALUES (@name, @isCompleted);');
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id, name, isCompleted) {
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    request.input('name', sql.NVarChar, name);
    request.input('isCompleted', sql.Bit, isCompleted === true);

    try {
      await request.query('UPDATE tasks SET name = @name, isCompleted = @isCompleted WHERE id = @id;');
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id) {
    const request = new sql.Request();
    request.input('id', sql.Int, id);

    try {
      await request.query('DELETE FROM tasks WHERE id = @id;');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

module.exports = TaskRepository;
