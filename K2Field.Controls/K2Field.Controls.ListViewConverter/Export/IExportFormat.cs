using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace K2Field.Controls.ListViewConverter.Export
{
    public interface IExportFormat
    {
        void GetFile();

        //TODO: Need to implement a method, which returns a real file for AJAX call
    }
}
